import { AppTheme } from '@/theme';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  goBackContainer: {
    height: AppTheme.spacing['5xl'],
    width: AppTheme.spacing['5xl'],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: AppTheme.spacing.xl,
  },
  header: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: AppTheme.spacing['3xl'],
  },
  title: {
    fontSize: AppTheme.fonts.size.heading,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.sm,
  },
  subtitle: {
    fontSize: AppTheme.fonts.size.subtitle,
    color: AppTheme.colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: AppTheme.spacing.lg,
  },
  label: {
    fontSize: AppTheme.fonts.size.default,
    fontWeight: AppTheme.fonts.weight.medium,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.sm,
    fontSize: AppTheme.fonts.size.default,
    backgroundColor: AppTheme.colors.secondary,
  },
  button: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.sm,
    alignItems: 'center',
    marginTop: AppTheme.spacing.xxl,
  },
  buttonDisabled: {
    backgroundColor: AppTheme.colors.muted,
  },
  buttonText: {
    color: AppTheme.colors.background,
    fontSize: AppTheme.fonts.size.default,
    fontWeight: AppTheme.fonts.weight.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: AppTheme.spacing.lg,
  },
  footerText: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
  },
  emphasis: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.primary,
    fontWeight: AppTheme.fonts.weight.medium,
  },
});
