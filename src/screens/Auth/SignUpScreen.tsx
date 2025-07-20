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
import { AppTheme } from '@/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppScreens, RootStackParamList } from '@/interfaces/navigation';
import { useAuthService } from '@/hooks/Auth/AuthContext';

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signUp, isLoading, isInitialized } = useAuthService();

  const route = useRoute<RouteProp<RootStackParamList, AppScreens.SignUp>>();
  const { email: initialEmail = '' } = route.params || {};

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUpSuccess = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: AppScreens.Login, params: { email, password } }],
    });
  }, [navigation, email, password]);

  const handleSignUp = useCallback(async () => {
    if (isLoading) {
      Alert.alert('Error', 'Another sign up attempt is already in progress');
      return;
    }

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const response = await signUp(email, password);

    if (response.error) {
      Alert.alert(
        'Error',
        response.error.message ||
          'An error occurred while signing up, please try again.',
      );
      return;
    }

    Alert.alert(
      'Success',
      'Account created successfully! Please check your email for verification.',
      [{ text: 'OK', onPress: () => onSignUpSuccess() }],
    );
  }, [email, password, isLoading, confirmPassword, signUp, onSignUpSuccess]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity
        style={styles.goBackContainer}
        disabled={isLoading}
        onPress={navigation.goBack}
      >
        <Icon name="arrow-left" size={24} color={AppTheme.colors.text} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={AppTheme.colors.muted}
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
              placeholderTextColor={AppTheme.colors.muted}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repeat your password"
              placeholderTextColor={AppTheme.colors.muted}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (isLoading || !isInitialized) && styles.buttonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={isLoading || !isInitialized}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity disabled={isLoading} onPress={navigation.goBack}>
              <Text style={styles.emphasis}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
