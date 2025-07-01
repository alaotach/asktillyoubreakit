export interface TopicStats {
    topic: string;
    attempted: number;
    correct: number;
    accuracy: number;
}

export interface UserStats {
    attempted: number;
    correct: number;
    accuracy: number;
    topicStats: TopicStats[];
}

function getDefaultStats(): UserStats {
  return {
    attempted: 0,
    correct: 0,
    accuracy: 0,
    topicStats: [],
  };
}

export function save(stats: UserStats) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Error saving user stats:", error);
    }
}

export function reset(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STATS_KEY);
}

const STATS_KEY = "user_stats";
export function get(): UserStats {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) {
        return getDefaultStats();
    }
    const parsed = JSON.parse(stored);
    parsed.topicStats = parsed.topicStats.map((topic: TopicStats) => ({
      ...topic,
    }));
    return parsed;
  } catch (error) {
    console.error("Error parsing user stats:", error);
    return getDefaultStats();
  }
}

export function update(topic: string, isCorrect: boolean): void {
  const stats = get();
  stats.attempted++;
  if (isCorrect) stats.correct++;
  stats.accuracy = (stats.correct / stats.attempted)*100;
  let topicStat = stats.topicStats.find(t => t.topic === topic);
  if (!topicStat) {
    topicStat = {
      topic,
      attempted: 0,
      correct: 0,
      accuracy: 0,
    };
    stats.topicStats.push(topicStat);
  }
  topicStat.attempted++;
  if (isCorrect) topicStat.correct++;
  topicStat.accuracy = (topicStat.correct / topicStat.attempted) * 100;
  save(stats);
}

export function getTop(limit: number = 5): TopicStats[] {
  const stats = get();
  return stats.topicStats
    .sort((a, b) => b.attempted - a.attempted)
    .slice(0, limit);
}

export function bestAccuracy(limit: number = 5): TopicStats[] {
  const stats = get();
  return stats.topicStats
    .filter(t => t.attempted >= 5)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, limit);
}