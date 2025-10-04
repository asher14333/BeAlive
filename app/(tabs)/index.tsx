import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';

export default function HomeScreen() {
  const { state, dispatch } = useApp();
  const { challenges } = state;

  const handleCommit = (challengeId: string, choice: 'yes' | 'no') => {
    const action = choice === 'yes' ? 'support' : 'be skeptical about';
    const actionText = choice === 'yes' ? 'Support' : 'Be Skeptical';
    Alert.alert(
      `${actionText} This Journey`,
      `Are you sure you want to ${action} this journey? This investment cannot be changed.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: actionText,
          style: 'destructive',
          onPress: () => {
            dispatch({
              type: 'COMMIT_TO_CHALLENGE',
              payload: { challengeId, choice }
            });
          }
        }
      ]
    );
  };

  const renderChallengeCard = (challenge: typeof challenges[0]) => (
    <View key={challenge.id} style={styles.challengeCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {challenge.creator.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>{challenge.creator}</Text>
            <Text style={styles.timestamp}>{challenge.expiry}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Challenge Title */}
      <Text style={styles.challengeTitle}>{challenge.title}</Text>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: challenge.snapshot }} style={styles.image} />
      </View>

      {/* Like/Dislike Bar */}
      <View style={styles.engagementBar}>
        <View style={styles.engagementLeft}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => handleCommit(challenge.id, 'yes')}
          >
            <Ionicons
              name={challenge.myCommitment === 'yes' ? "thumbs-up" : "thumbs-up-outline"}
              size={24}
              color={challenge.myCommitment === 'yes' ? "#10B981" : "#111827"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={() => handleCommit(challenge.id, 'no')}
          >
            <Ionicons
              name={challenge.myCommitment === 'no' ? "thumbs-down" : "thumbs-down-outline"}
              size={24}
              color={challenge.myCommitment === 'no' ? "#EF4444" : "#111827"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.engagementButton}>
          <Ionicons name="bookmark-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

        {/* Investment Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Fund: ${challenge.totalPool}</Text>
            <Text style={styles.statsLabel}>Investment: ${challenge.stake}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Supporters: {challenge.yesCount}</Text>
            <Text style={styles.statsLabel}>Skeptics: {challenge.noCount}</Text>
          </View>
        </View>

      {/* Investment Status */}
      {challenge.myCommitment && (
        <View style={styles.commitmentStatus}>
          <Text style={[
            styles.commitmentText,
            challenge.myCommitment === 'yes' ? styles.supportingText : styles.skepticalText
          ]}>
            {challenge.myCommitment === 'yes' ? '✓ Supporting' : '✓ Skeptical'} - Committed
          </Text>
        </View>
      )}

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Challenges</Text>
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {challenges.map(renderChallengeCard)}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/create-challenge')}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.3,
  },
  cameraButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 0,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
    letterSpacing: 0,
  },
  moreButton: {
    padding: 4,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 8,
    letterSpacing: 0,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9FAFB',
  },
  engagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  engagementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementButton: {
    padding: 8,
    marginRight: 8,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    letterSpacing: 0,
  },
  commitmentStatus: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  commitmentText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0,
  },
  supportingText: {
    color: '#10B981',
  },
  skepticalText: {
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
