import { $DeepPartial } from '@callstack/react-theme-provider';
import { useTheme } from 'react-native-paper';
import merge from 'deepmerge';

/**
 * useAlternateTheme hook
 *
 * This hook is used to set up the alternative theme for various components (mostly in dark mode). Some RNP components use colors
 * from the theme that we would prefer that they did not. For these components, we modify the theme to move the colors
 * we want into the variables that are being used by RNP (e.g., for primary colored buttons, we want to use the dark variation).
 *
 * @returns a partial theme that can be passed to the `theme` prop of a RNP component
 */
export const useAlternateTheme = (
    themeOverride: $DeepPartial<ReactNativePaper.Theme> | undefined,
    extraLight?: $DeepPartial<ReactNativePaper.Theme>,
    extraDark?: $DeepPartial<ReactNativePaper.Theme>
): $DeepPartial<ReactNativePaper.Theme> | undefined => {
    const theme = useTheme(themeOverride);
    const altDarkTheme: $DeepPartial<ReactNativePaper.Theme> = merge.all([
        {
            colors: {
                primary: theme.colors?.primaryPalette?.dark || theme.colors.primary,
                accent: theme.colors?.accentPalette?.dark || theme.colors.accent,
                background: theme.colors.surface,
                notification: theme.colors?.accentPalette?.dark || theme.colors.notification,
            },
        },
        extraDark || {},
        themeOverride || {},
    ]);

    const altLightTheme: $DeepPartial<ReactNativePaper.Theme> = merge.all([{}, extraLight || {}, themeOverride || {}]);

    return theme.dark ? altDarkTheme : altLightTheme;
};
