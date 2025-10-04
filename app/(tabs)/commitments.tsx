import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';

export default function CommitmentsScreen() {
  const { state } = useApp();
  const { challenges } = state;
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  
  // Filter challenges where user has committed
  const commitments = challenges.filter(challenge => challenge.myCommitment !== null);
  
  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };
  const renderCommitmentCard = (commitment: typeof commitments[0]) => {
    const expectedPayout = commitment.myCommitment === 'yes' 
      ? (commitment.totalPool / commitment.yesCount) 
      : (commitment.totalPool / commitment.noCount);
    
    const isExpanded = expandedCards.has(commitment.id);
    
    return (
      <View key={commitment.id} style={styles.commitmentCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {commitment.creator.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.username}>{commitment.creator}</Text>
              <Text style={styles.timestamp}>{commitment.expiry}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Challenge Title */}
        <Text style={styles.challengeTitle}>{commitment.title}</Text>

        {/* Investment Status */}
        <View style={styles.investmentStatus}>
          <View style={[
            styles.investmentBadge,
            commitment.myCommitment === 'yes' ? styles.supportingBadge : styles.skepticalBadge
          ]}>
            <Ionicons 
              name={commitment.myCommitment === 'yes' ? "heart" : "trending-down"} 
              size={16} 
              color={commitment.myCommitment === 'yes' ? "#10B981" : "#6B7280"} 
            />
            <Text style={[
              styles.investmentText,
              commitment.myCommitment === 'yes' ? styles.supportingText : styles.skepticalText
            ]}>
              {commitment.myCommitment === 'yes' ? 'Supporting' : 'Skeptical'} - Committed
            </Text>
          </View>
        </View>

        {/* Investment Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total Fund: ${commitment.totalPool}</Text>
            <Text style={styles.statsLabel}>My Investment: ${commitment.stake}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Supporters: {commitment.yesCount}</Text>
            <Text style={styles.statsLabel}>Skeptics: {commitment.noCount}</Text>
          </View>
        </View>

        {/* View Details Button */}
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => toggleCardExpansion(commitment.id)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={16} 
            color="#111827" 
          />
        </TouchableOpacity>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.expandedDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Fund:</Text>
              <Text style={styles.detailValue}>${commitment.totalPool}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Supporters Fund:</Text>
              <Text style={styles.detailValue}>${commitment.yesPool}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Skeptics Fund:</Text>
              <Text style={styles.detailValue}>${commitment.noPool}</Text>
            </View>
            <View style={[styles.detailRow, styles.expectedPayout]}>
              <Text style={styles.detailLabel}>Expected Return:</Text>
              <Text style={styles.detailValue}>${expectedPayout.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Investments</Text>
          <Text style={styles.subtitle}>Supporting people's journeys</Text>
        </View>

        {commitments.length > 0 ? (
          commitments.map(renderCommitmentCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="trending-up-outline" size={64} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No investments yet</Text>
            <Text style={styles.emptySubtitle}>
              Start supporting your friends' journeys!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 20,
  },
  commitmentCard: {
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
  investmentStatus: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  investmentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    gap: 6,
  },
  supportingBadge: {
    backgroundColor: '#ECFDF5',
  },
  skepticalBadge: {
    backgroundColor: '#F9FAFB',
  },
  investmentText: {
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
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
    letterSpacing: 0,
  },
  expandedDetails: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expectedPayout: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    letterSpacing: 0,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 0,
  },
  emptyState: {
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  creatorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    letterSpacing: 0,
  },
  expiryText: {
    fontSize: 10,
    color: '#F59E0B',
    fontWeight: '600',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    letterSpacing: 0,
  },
  choiceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  choiceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 0,
  },
  yesChoice: {
    backgroundColor: '#ECFDF5',
  },
  noChoice: {
    backgroundColor: '#FEF2F2',
  },
  choiceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
    letterSpacing: 0.3,
  },
  lockedText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    letterSpacing: 0.4,
  },
  stakeText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  poolStats: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  poolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expectedPayout: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
  },
  poolLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    letterSpacing: 0,
  },
  poolValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: 0,
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginRight: 6,
    letterSpacing: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  },
});
