import React, { ReactNode, useCallback, useState } from 'react';
import { Subtitle } from '../typography';
import { StyleSheet, View, ViewProps, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { DrawerNavItem, NavItem, NestedNavItem, DrawerNavItemProps } from './drawer-nav-item';
import { inheritDrawerProps, NavGroupInheritableProps } from './inheritable-types';
import { Divider, Theme, useTheme, DefaultTheme } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import * as Colors from '@pxblue/colors';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

export type DrawerNavGroupProps = ViewProps & {
    // List of navigation items to render
    items: NavItem[];

    // Text to display in the group header
    title?: string;

    // Custom element, substitute for title
    titleContent?: ReactNode;

    /** Style overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        content?: StyleProp<ViewStyle>;
        textContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        divider?: StyleProp<ViewStyle>;
        navItem?: DrawerNavItemProps['styles'];
    };
    /** Overrides for theme */
    theme?: Theme;
} & NavGroupInheritableProps;

const makeStyles = (theme: Theme) => StyleSheet.create({
    root: {},
    textContent: {},
    title: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        height: 52,
        lineHeight: 36,
    },
    divider: {},
});

// TODO: Can't this be replaced with a Set of itemIDs?
function findID(item: NavItem | NestedNavItem, activeItem = ''): boolean {
    // if leaf node, return
    if (!item.items) {
        return item.itemID === activeItem;
    }

    // else, loop through the branches
    for (let i = 0; i < item.items.length; i++) {
        if (findID(item.items[i], activeItem)) {
            return true;
        }
    }

    // no active items found, return false
    return false;
}

export const DrawerNavGroup: React.FC<DrawerNavGroupProps> = (props) => {
    const {theme: themeOverride} = props;
    const theme = useTheme(themeOverride);
    const { title, titleContent, items = [], nestedDivider = false, styles = {}, style  } = props;
    const nestedBackgroundColor = theme.dark ? Colors.darkBlack[100] : Colors.white[200];

    const defaultStyles = makeStyles(theme);

    const getDrawerItemList = useCallback(
        (item: NavItem | NestedNavItem, depth: number): ReactNode => {
            const [expanded, setExpanded] = useState(findID(item, props.activeItem));

            // Nested items inherit from the nestedDivider prop if item's divider is unset.
            if (depth > 0 && item.divider === undefined) {
                item.divider = nestedDivider as any; // typescript doesn't like trying to assign boolean to type undefined
            }

            // if there are more sub pages, add the bucket header and recurse on this function
            if (item.items) {
                // Default expand icon changes if item is nested.
                if (depth > 0) {
                    if (!item.expandIcon) {
                        item.expandIcon = <MatIcon name={'arrow-drop-down'} size={24} color={theme.colors.text} />;
                    }
                    if (!item.collapseIcon) {
                        item.collapseIcon = <MatIcon name={'arrow-drop-up'} size={24} color={theme.colors.text} />;
                    }
                }

                return (
                    <View key={`${item.itemID}`}>
                        <DrawerNavItem
                            navItem={inheritDrawerProps(props, item) as NavItem}
                            navGroupProps={props}
                            depth={depth}
                            expanded={expanded}
                            expandHandler={item.items ? (): void => setExpanded(!expanded) : undefined}
                            styles={styles.navItem}
                        />
                        <Collapsible collapsed={!expanded} style={[{ backgroundColor: nestedBackgroundColor }, styles.content]}>
                            {item.items.map((subItem: NavItem) => getDrawerItemList(subItem, depth + 1))}
                            <Divider style={[defaultStyles.divider, styles.divider]}/>
                        </Collapsible>
                    </View>
                );
            }
            // Otherwise, we reached a leaf node. Return.
            return (
                <DrawerNavItem
                    depth={depth}
                    expanded={false}
                    navItem={inheritDrawerProps(props, item) as NavItem}
                    key={item.itemID}
                    navGroupProps={props}
                    styles={styles.navItem}
                />
            );
        },
        [props]
    );

    return (
        <View style={[defaultStyles.root, styles.root, style]}>
            {titleContent}
            {!titleContent && title && (
                <View style={[defaultStyles.textContent, styles.textContent]}>
                    <Divider style={[defaultStyles.divider, styles.divider]}/>
                    <Subtitle style={[defaultStyles.title, styles.title]}>{title}</Subtitle>
                    <Divider style={[defaultStyles.divider, styles.divider]} />
                </View>
            )}
            {items.map((item: NavItem) => getDrawerItemList(item, 0))}
        </View>
    );
};

DrawerNavGroup.displayName = 'DrawerNavGroup';
