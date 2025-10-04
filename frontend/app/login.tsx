import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const { dispatch } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState<'phone' | 'verify'>('phone');

  const handleSendCode = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    // Simulate sending verification code
    Alert.alert(
      'Code Sent',
      `Verification code sent to ${phoneNumber}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setIsVerifying(true);
            setStep('verify');
          },
        },
      ]
    );
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    // Simulate verification
    if (verificationCode === '123456') {
      // Set user and authenticate
      dispatch({
        type: 'SET_USER',
        payload: {
          id: '1',
          name: 'John Doe',
          phone: phoneNumber,
          avatar: 'JD',
        },
      });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      Alert.alert(
        'Success',
        'Phone number verified successfully!',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Invalid verification code. Try 123456');
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setIsVerifying(false);
    setVerificationCode('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to BeAlive</Text>
          <Text style={styles.subtitle}>
            {step === 'phone' 
              ? 'Enter your phone number to get started'
              : 'Enter the verification code we sent you'
            }
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {step === 'phone' ? (
            <>
              <Input
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              
              <Button
                title="Send Verification Code"
                onPress={handleSendCode}
                style={styles.button}
              />
            </>
          ) : (
            <>
              <View style={styles.phoneDisplay}>
                <Text style={styles.phoneText}>Code sent to {phoneNumber}</Text>
                <TouchableOpacity onPress={handleBackToPhone}>
                  <Text style={styles.changeNumberText}>Change number</Text>
                </TouchableOpacity>
              </View>

              <Input
                label="Verification Code"
                placeholder="123456"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="numeric"
              />

              <Button
                title="Verify Code"
                onPress={handleVerifyCode}
                style={styles.button}
              />

              <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendText}>Resend code</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Demo Note */}
        <View style={styles.demoNote}>
          <Ionicons name="information-circle" size={16} color="#666666" />
          <Text style={styles.demoText}>
            Demo: Use verification code 123456
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  button: {
    marginTop: 8,
  },
  phoneDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  phoneText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  changeNumberText: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontSize: 13,
    color: '#111827',
    textDecorationLine: 'underline',
  },
  demoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  demoText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
    letterSpacing: 0,
  },
});
