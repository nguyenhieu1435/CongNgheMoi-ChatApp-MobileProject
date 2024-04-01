import { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';
export const ChevronDown = ({
    style = {},
    stroke = 'currentColor',
}: {
    style?: StyleProp<ViewStyle>;
    stroke?: string;
}) => (
    <Svg
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke={stroke}
        style={style}
    >
        <Path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
        />
    </Svg>
);

export const Check = ({
    style = {},
    stroke = 'currentColor',
}: {
    style?: StyleProp<ViewStyle>;
    stroke?: string;
}) => (
    <Svg
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke={stroke}
        style={style}
    >
        <Path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m4.5 12.75 6 6 9-13.5'
        />
    </Svg>
);
