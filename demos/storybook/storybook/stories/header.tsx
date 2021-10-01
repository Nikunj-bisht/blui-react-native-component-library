import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { boolean, color, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { CollapsibleHeaderLayout, Header } from '@pxblue/react-native-components';
import { white, blue } from '@pxblue/colors';
import backgroundImage from '../assets/farm.jpg';
import { Text, View } from 'react-native';
import { IconFamily } from '@pxblue/react-native-components/core/__types__';
const MailIcon: IconFamily = { name: 'mail' };
const MenuIcon: IconFamily = { name: 'menu' };
const MoreIcon: IconFamily = { name: 'more-vert' };
const CloudIcon: IconFamily = { name: 'cloud-upload' };
storiesOf('Header', module)
    .addDecorator(withKnobs)
    .add('with basic usage', () => (
        <Header
            title={text('title', 'Title')}
            icon={MenuIcon}
            onIconPress={(): void => {
                /* do nothing */
            }}
            actionItems={[
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
        />
    ))
    .add('with background image', () => (
        <Header
            expandable={true}
            title={text('title', 'Long Title Text')}
            subtitle={text('subtitle', 'Really Really Long Subtitle Text')}
            icon={MenuIcon}
            onIconPress={(): void => {
                /* do nothing */
            }}
            actionItems={[
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            backgroundImage={backgroundImage}
        />
    ))
    .add('with search', () => (
        <Header
            expandable={false}
            title={text('title', 'With Search')}
            icon={MenuIcon}
            onIconPress={(): void => {
                /* do nothing */
            }}
            actionItems={[
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            searchableConfig={{ placeholder: 'Search', autoFocus: true }}
        />
    ))
    .add('with custom colors', () => (
        <Header
            title={text('title', 'With Custom Colors')}
            icon={MenuIcon}
            onIconPress={(): void => {
                /* do nothing */
            }}
            actionItems={[
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            fontColor={color('fontColor', white[50])}
            backgroundColor={color('backgroundColor', blue[500])}
        />
    ))
    .add('with full config', () => (
        <Header
            title={text('title', 'Title Text')}
            subtitle={text('subtitle', 'Subtitle Text')}
            icon={MenuIcon}
            onIconPress={(): void => {
                /* do nothing */
            }}
            actionItems={[
                {
                    icon: MailIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: CloudIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
                {
                    icon: MoreIcon,
                    onPress: (): void => {
                        /* do nothing */
                    },
                },
            ].slice(0, number('action items', 3, { range: true, min: 0, max: 3, step: 1 }))}
            fontColor={color('fontColor', white[50])}
            backgroundColor={color('backgroundColor', blue[500])}
            variant={select('variant', ['static', 'dynamic'], 'static')}
            expandable={boolean('expandable', false)}
            startExpanded={boolean('startExpanded', false)}
            expandedHeight={number('expandedHeight', 200, { range: true, min: 100, max: 500, step: 10 })}
            collapsedHeight={number('collapsedHeight', 56, { range: true, min: 50, max: 100, step: 5 })}
        />
    ))
    .add('within CollapsibleHeaderLayout', () => (
        <CollapsibleHeaderLayout
            HeaderProps={{
                title: 'Title Text',
                subtitle: 'Subtitle Text',
                icon: MenuIcon,
                onIconPress: (): void => {
                    /* do nothing */
                },
                actionItems: [
                    {
                        icon: MailIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                    {
                        icon: CloudIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                    {
                        icon: MoreIcon,
                        onPress: (): void => {
                            /* do nothing */
                        },
                    },
                ],
                variant: 'dynamic',
                expandable: true,
                startExpanded: true,
                expandedHeight: number('expandedHeight', 200, { range: true, min: 100, max: 500, step: 10 }),
                collapsedHeight: number('collapsedHeight', 56, { range: true, min: 50, max: 100, step: 5 }),
            }}
        >
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus nulla ut hendrerit
                imperdiet. Donec vel sapien venenatis, hendrerit quam sed, varius arcu. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis egestas. Cras mollis lobortis ipsum, ut
                ullamcorper turpis eleifend vitae. Pellentesque ac sagittis ex, sed gravida turpis. Aliquam finibus
                consectetur dui quis cursus. Morbi ut enim quis dolor mollis pharetra id quis ligula. Nam vitae gravida
                odio. Donec neque erat, tincidunt suscipit ligula non, egestas vestibulum neque. Vestibulum feugiat in
                arcu at mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at risus eu urna
                porta iaculis. Donec consequat at eros consectetur faucibus. Maecenas venenatis purus vitae ultricies
                ultricies. Quisque volutpat neque ac nibh pulvinar, et mollis nunc efficitur.
            </Text>
            <View style={{ width: 100, height: 1000 }} />
        </CollapsibleHeaderLayout>
    ));
