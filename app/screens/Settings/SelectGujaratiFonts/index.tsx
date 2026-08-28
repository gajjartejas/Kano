import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

// ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';

// App Modules
import styles from './styles';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import { AppTheme } from 'app/models/theme';
import AppHeader from 'app/components/AppHeader';
import CommonIcon from 'app/components/CommonIcon';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import { GUJARATI_FONTS, IGujaratiFontFamily } from 'app/config/fonts';
import useFontConfigStore from 'app/store/fontConfig';

// Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'SelectGujaratiFonts'>;

const SelectGujaratiFonts = ({ navigation }: Props) => {
  // Constants
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const largeScreenMode = useLargeScreenMode();
  const selectedFontId = useFontConfigStore(store => store.selectedFontId);
  const setSelectedFontId = useFontConfigStore(store => store.setSelectedFontId);

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onPressFont = useCallback(
    (font: IGujaratiFontFamily) => {
      setSelectedFontId(font.id);
    },
    [setSelectedFontId],
  );

  const renderItem = ({ item }: { item: IGujaratiFontFamily }) => {
    const isSelected = item.id === selectedFontId;
    const fontRegular = item.fonts.Regular;
    const fontBold = item.fonts.Bold || item.fonts.Regular;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPressFont(item)}
        style={[
          styles.card,
          {
            backgroundColor: `${colors.onBackground}08`,
            borderColor: isSelected ? colors.primary : 'transparent',
          },
        ]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>{item.name}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: `${colors.primary}20` }]}>
              <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>{item.category}</Text>
            </View>
          </View>
          {isSelected ? (
            <CommonIcon type="material" name="check-circle" size={24} color={colors.primary} />
          ) : (
            <CommonIcon type="material" name="radiobox-blank" size={24} color={`${colors.onSurface}40`} />
          )}
        </View>

        <View style={[styles.previewContainer, { backgroundColor: `${colors.onBackground}06` }]}>
          <View style={styles.previewMainRow}>
            <View style={[styles.previewCharBadge, { backgroundColor: `${colors.primary}18` }]}>
              <Text style={[styles.previewCharText, { fontFamily: fontBold, color: colors.primary }]}>
                {item.sampleChar}
              </Text>
            </View>
            <Text style={[styles.previewPhraseText, { fontFamily: fontRegular, color: colors.onSurface }]}>
              {item.preview}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={[styles.previewAlphabetText, { fontFamily: fontRegular, color: `${colors.onSurface}80` }]}>
            {item.sampleAlphabet}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.previewNumbersText, { fontFamily: fontRegular, color: `${colors.onSurface}60` }]}>
            {item.sampleNumbers}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('generalSetting.section1.row2.title')}
        style={{ backgroundColor: colors.background }}
      />

      <Components.AppBaseView edges={[]} style={styles.safeArea}>
        <FlatList
          contentContainerStyle={[styles.flatlist, largeScreenMode && styles.cardTablet]}
          keyboardShouldPersistTaps={'handled'}
          data={GUJARATI_FONTS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Components.AppBaseView>
    </Components.AppBaseView>
  );
};

export default SelectGujaratiFonts;
