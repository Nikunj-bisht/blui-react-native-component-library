import React from 'react';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { wrapIcon } from '../icon-wrapper/icon-wrapper';
import { HeaderIcon } from './headerIcon';
import { useSearch } from './contexts/SearchContextProvider';
import { HeaderAvatar, HeaderIcon as HeaderIconType } from '../__types__';

const ClearIcon = wrapIcon({ IconClass: Icon, name: 'clear' });
const SearchIcon = wrapIcon({ IconClass: Icon, name: 'search' });

const defaultStyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 8,
        height: 56,
        marginTop: -8,
    },
    actionItem: {
        height: 40,
        width: 40,
        padding: 8,
        marginHorizontal: 4,
    },
    avatar: {
        height: 40,
        width: 40,
        marginHorizontal: 12,
    },
});

type ActionItemProps = {
    /** List of up to three action items on the right of the header */
    actionItems?: Array<HeaderIconType | HeaderAvatar>;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        actionItem?: StyleProp<ViewStyle>;
        avatar?: StyleProp<ViewStyle>;
    };
};

export const HeaderActionItems: React.FC<ActionItemProps> = (props) => {
    const { actionItems, styles = {} } = props;
    const { searchConfig, searching, query, onClear, onSearch } = useSearch();
    const MAX_ITEMS = 3;

    let items: Array<HeaderIconType | HeaderAvatar> = actionItems || [];

    if (searching) {
        if (query) {
            items = [
                {
                    icon: ClearIcon,
                    onPress: onClear,
                },
            ];
        } else {
            items = [];
        }
    } else if (searchConfig) {
        items = [
            {
                icon: SearchIcon,
                onPress: onSearch,
            },
        ];
        if (actionItems) {
            items = items.concat(actionItems);
        }
    }

    if (items) {
        return (
            <View style={[defaultStyles.root, styles.root]}>
                {items.slice(0, MAX_ITEMS).map((actionItem: HeaderIconType | HeaderAvatar, index) => {
                    if ('component' in actionItem) {
                        return (
                            <View
                                key={`action_${index}`}
                                testID={`header-action-item${index}`}
                                style={[defaultStyles.avatar, styles.avatar]}
                            >
                                {actionItem.component}
                            </View>
                        );
                    }
                    return (
                        <TouchableOpacity
                            key={`action_${index}`}
                            testID={`header-action-item${index}`}
                            onPress={actionItem.onPress}
                            style={[defaultStyles.actionItem, styles.actionItem]}
                        >
                            <HeaderIcon IconClass={actionItem.icon} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
    return null;
};
