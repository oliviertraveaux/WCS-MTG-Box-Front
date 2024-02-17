import { CardRarity, UserCard } from '@shared';

const userCardsMock: UserCard[] = [
    {
        cardInfo: {
            apiCardId: 'api_card_id_1',
            name: 'Card 1',
            frenchName: 'Carte 1',
            imageUrl: 'https://example.com/image1.jpg',
            frenchImageUrl: 'https://example.com/image1_fr.jpg',
            manaCost: 3,
            rarity: CardRarity.common,
            setAbbreviation: 'SET1',
            setName: 'Set 1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            artist: 'Artist 1',
        },
        userInfo: {
            userId: 123,
            qualityId: 1,
            languageId: 1,
        },
    },
    {
        cardInfo: {
            apiCardId: 'api_card_id_2',
            name: 'Card 2',
            frenchName: 'Carte 2',
            imageUrl: 'https://example.com/image2.jpg',
            frenchImageUrl: 'https://example.com/image2_fr.jpg',
            manaCost: 4,
            rarity: CardRarity.common,
            setAbbreviation: 'SET2',
            setName: 'Set 2',
            text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            artist: 'Artist 2',
        },
        userInfo: {
            userId: 456,
            qualityId: 2,
            languageId: 2,
        },
    },
    {
        cardInfo: {
            apiCardId: 'api_card_id_3',
            name: 'Card 3',
            frenchName: 'Carte 3',
            imageUrl: 'https://example.com/image3.jpg',
            frenchImageUrl: 'https://example.com/image3_fr.jpg',
            manaCost: 5,
            rarity: CardRarity.mythicRare,
            setAbbreviation: 'SET3',
            setName: 'Set 3',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            artist: 'Artist 3',
        },
        userInfo: {
            userId: 789,
            qualityId: 3,
            languageId: 1,
        },
    },
];

export default userCardsMock;
