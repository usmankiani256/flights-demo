import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { AppScreens, RootStackParamList } from '@/interfaces/navigation';
import { useAuthService } from '@/hooks/Auth/AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signIn, isLoading, isInitialized } = useAuthService();

  const route = useRoute<RouteProp<RootStackParamList, AppScreens.Login>>();
  const { email: initialEmail = '', password: initialPassword = '' } =
    route.params || {};

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const handleLogin = useCallback(async () => {
    if (isLoading) {
      Alert.alert('Error', 'Another login attempt is already in progress');
      return;
    }

    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in your email and password');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const response = await signIn(email, password);

    if (response.error) {
      Alert.alert(
        'Error',
        response.error.message ||
          'An error occurred while logging in, please try again.',
      );
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: AppScreens.Home }],
    });
  }, [email, password, isLoading, signIn, navigation]);

  const handleSignUp = useCallback(() => {
    navigation.navigate(AppScreens.SignUp, { email });
  }, [navigation, email]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (isLoading || !isInitialized) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading || !isInitialized}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity disabled={isLoading} onPress={handleSignUp}>
              <Text style={styles.emphasis}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
