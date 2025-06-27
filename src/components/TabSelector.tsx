import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface TabSelectorProps {
  tabs: string[];
  selectedTab: string;
  onTabPress: (tab: string) => void;
  style?: any;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs, selectedTab, onTabPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.selectedTab]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: wp('1%'),
  },
  tab: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: '#4DD0E1',
  },
  tabText: {
    fontSize: hp('1.8%'),
    fontWeight: '500',
    color: '#888',
  },
  selectedTabText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TabSelector;
