//ThirdParty
import { IConsonantListItem, IConsonantListSection } from 'app/components/ConsonantListItem';
import { useTranslation } from 'react-i18next';

const useConsonantListItems = (): IConsonantListSection[] => {
    //Constants
    const { t } = useTranslation();

    let entries: IConsonantListItem[] = [
        {
            id: 0,
            title: 'Alphabets Chart',
            subTitle: '10 hours, 19 lessons',
            iconName: 'table',
            iconFamily: 'font-awesome5'
        },
        {
            id: 1,
            title: 'Learn in Sqeuence',
            subTitle: '10 hours, 19 lessons',
            iconName: 'sort-alpha-down',
            iconFamily: 'font-awesome5'
        },
        {
            id: 2,
            title: 'Memorize random order.',
            subTitle: '10 hours, 19 lessons',
            iconName: 'random',
            iconFamily: 'font-awesome5'
        },
    ];

    let entries1: IConsonantListItem[] = [
        {
            id: 0,
            title: 'Practice by Order',
            subTitle: '10 hours, 19 lessons',
            iconName: 'sort-alpha-down',
            iconFamily: 'font-awesome5'
        },
        {
            id: 1,
            title: 'Practice by Random Order.',
            subTitle: '10 hours, 19 lessons',
            iconName: 'random',
            iconFamily: 'font-awesome5'
        },
    ];

    let sections: IConsonantListSection[] = [
        {
            title: 'Learn',
            data: entries,
        },
        {
            title: 'Practice',
            data: entries1,
        },
    ];

    return sections;
};

export default useConsonantListItems;
