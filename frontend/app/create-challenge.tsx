import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreateChallengeScreen() {
  const [challengeText, setChallengeText] = useState('');
  const [stake, setStake] = useState('20');
  const [expiryDays, setExpiryDays] = useState('7');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreateChallenge = () => {
    if (!challengeText.trim()) {
      Alert.alert('Error', 'Please enter a journey description');
      return;
    }
    if (!stake || parseFloat(stake) <= 0) {
      Alert.alert('Error', 'Please enter a valid investment amount');
      return;
    }
    if (!expiryDays || parseInt(expiryDays) <= 0) {
      Alert.alert('Error', 'Please enter a valid completion period');
      return;
    }

    Alert.alert(
      'Journey Created!',
      'Your journey has been shared with your friends for support.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleImagePicker = () => {
    // In a real app, this would open the image picker
    Alert.alert(
      'Add Photo',
      'Choose how you want to add a photo',
      [
        { text: 'Camera', onPress: () => setSelectedImage('https://via.placeholder.com/300x200/000000/FFFFFF?text=Photo') },
        { text: 'Gallery', onPress: () => setSelectedImage('https://via.placeholder.com/300x200/000000/FFFFFF?text=Photo') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Journey</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Journey Photo *</Text>
          <Text style={styles.sectionSubtitle}>
            Start with a snapshot to show your journey
          </Text>
          
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="camera" size={32} color="#CCCCCC" />
                <Text style={styles.imagePlaceholderText}>Tap to add photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Challenge Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journey Description *</Text>
          <Text style={styles.sectionSubtitle}>
            What journey do you want to share with friends?
          </Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="e.g., I'm going to the gym 5 days this week"
            placeholderTextColor="#CCCCCC"
            value={challengeText}
            onChangeText={setChallengeText}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Stake Amount */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Amount *</Text>
          <Text style={styles.sectionSubtitle}>
            How much should each supporter invest?
          </Text>
          
          <View style={styles.stakeContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.stakeInput}
              placeholder="20"
              placeholderTextColor="#CCCCCC"
              value={stake}
              onChangeText={setStake}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Expiry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journey Duration *</Text>
          <Text style={styles.sectionSubtitle}>
            How long should this journey last?
          </Text>
          
          <View style={styles.expiryContainer}>
            <TextInput
              style={styles.expiryInput}
              placeholder="7"
              placeholderTextColor="#CCCCCC"
              value={expiryDays}
              onChangeText={setExpiryDays}
              keyboardType="numeric"
            />
            <Text style={styles.expiryLabel}>days</Text>
          </View>
        </View>

        {/* Share Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share With</Text>
          <Text style={styles.sectionSubtitle}>
            Who can see and support this journey?
          </Text>
          
          <TouchableOpacity style={styles.shareOption}>
            <View style={styles.shareOptionLeft}>
              <Ionicons name="people" size={20} color="#000000" />
              <Text style={styles.shareOptionText}>All Friends</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateChallenge}>
          <Text style={styles.createButtonText}>Create Journey</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.2,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: 0,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
  },
  imagePicker: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 0,
  },
  selectedImage: {
    width: '100%',
    height: 160,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    textAlignVertical: 'top',
    minHeight: 80,
    backgroundColor: '#FFFFFF',
  },
  stakeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  dollarSign: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  stakeInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    paddingVertical: 12,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  expiryInput: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A0A0A',
    paddingVertical: 24,
    minWidth: 100,
  },
  expiryLabel: {
    fontSize: 20,
    color: '#6B7280',
    marginLeft: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  shareOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareOptionText: {
    fontSize: 18,
    color: '#0A0A0A',
    marginLeft: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  createButton: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 60,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
});
