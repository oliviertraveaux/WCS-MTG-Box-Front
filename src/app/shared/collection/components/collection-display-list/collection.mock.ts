import { CardRarity } from '../../enums/card-rarity.enum';
import { CardQuality } from '../../enums/cardQuality';
import { UserCard } from '../../models/user-card.model';

export const COLLECTION: UserCard[] = [
    {
        cardInfo: {
            apiCardId: '5169592e-dd93-535a-b5af-51c9aaccbf36',
            name: 'Emrakul, the Aeons Torn',
            frenchName: 'Emrakul, Déchirure des Éons',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571334&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571996&type=card',
            manaCost: 15,
            rarity: CardRarity.mythicRare,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Mark Tedin',
            text: "This spell can't be countered.\nWhen you cast this spell, take an extra turn after this one.\nFlying, protection from spells that are one or more colors, annihilator 6\nWhen Emrakul, the Aeons Torn is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.",
            uniqueId: 13,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 29,
        },
    },
    {
        cardInfo: {
            apiCardId: '14e24424-15a0-5b28-817f-de8c72748469',
            name: 'Kozilek, Butcher of Truth',
            frenchName: 'Kozilek, Boucher de la Vérité',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571335&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571997&type=card',
            manaCost: 10,
            rarity: CardRarity.mythicRare,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Michael Komarck',
            text: 'When you cast this spell, draw four cards.\nAnnihilator 4 (Whenever this creature attacks, defending player sacrifices four permanents.)\nWhen Kozilek, Butcher of Truth is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.',
            uniqueId: 14,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 30,
        },
    },
    {
        cardInfo: {
            apiCardId: '664e694d-acf8-5937-b1ca-9ce8ce48762c',
            name: 'Ulamog, the Infinite Gyre',
            frenchName: "Ulamog, l'Épicycle Infini",
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571336&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571998&type=card',
            manaCost: 11,
            rarity: CardRarity.mythicRare,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Aleksi Briclot',
            text: 'When you cast this spell, destroy target permanent.\nIndestructible\nAnnihilator 4 (Whenever this creature attacks, defending player sacrifices four permanents.)\nWhen Ulamog, the Infinite Gyre is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.',
            uniqueId: 15,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 31,
        },
    },
    {
        cardInfo: {
            apiCardId: '18468b64-37ef-5e4d-b95a-781265b533a2',
            name: 'Abzan Falconer',
            frenchName: 'Fauconnier abzan',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571337&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571999&type=card',
            manaCost: 3,
            rarity: CardRarity.unCommon,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Steven Belledin',
            text: 'Outlast {W} ({W}, {T}: Put a +1/+1 counter on this creature. Outlast only as a sorcery.)\nEach creature you control with a +1/+1 counter on it has flying.',
            uniqueId: 16,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 32,
        },
    },
    {
        cardInfo: {
            apiCardId: '454b109d-f148-5f55-a5a0-7316e013e8fa',
            name: 'Ainok Bond-Kin',
            frenchName: "Frère d'armes aïnok",
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571338&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=572000&type=card',
            manaCost: 2,
            rarity: CardRarity.common,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Chris Rahn',
            text: 'Outlast {1}{W} ({1}{W}, {T}: Put a +1/+1 counter on this creature. Outlast only as a sorcery.)\nEach creature you control with a +1/+1 counter on it has first strike.',
            uniqueId: 17,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.lightPlayed,
            languageName: 'English',
            userCardId: 33,
        },
    },
    {
        cardInfo: {
            apiCardId: 'ab1619d5-df3c-5434-b900-36561e62468f',
            name: 'Anointer of Valor',
            frenchName: 'Consécratrice du courage',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571339&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=572001&type=card',
            manaCost: 6,
            rarity: CardRarity.common,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Antonio José Manzanedo',
            text: 'Flying\nWhenever a creature attacks, you may pay {3}. When you do, put a +1/+1 counter on that creature.',
            uniqueId: 18,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.good,
            languageName: 'French',
            userCardId: 34,
        },
    },
];

export const COLLECTION_FILTERED: UserCard[] = [
    {
        cardInfo: {
            apiCardId: '14e24424-15a0-5b28-817f-de8c72748469',
            name: 'Kozilek, Butcher of Truth',
            frenchName: 'Kozilek, Boucher de la Vérité',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571335&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571997&type=card',
            manaCost: 10,
            rarity: CardRarity.mythicRare,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Michael Komarck',
            text: 'When you cast this spell, draw four cards.\nAnnihilator 4 (Whenever this creature attacks, defending player sacrifices four permanents.)\nWhen Kozilek, Butcher of Truth is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.',
            uniqueId: 14,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 30,
        },
    },
    {
        cardInfo: {
            apiCardId: '664e694d-acf8-5937-b1ca-9ce8ce48762c',
            name: 'Ulamog, the Infinite Gyre',
            frenchName: "Ulamog, l'Épicycle Infini",
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571336&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571998&type=card',
            manaCost: 11,
            rarity: CardRarity.mythicRare,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Aleksi Briclot',
            text: 'When you cast this spell, destroy target permanent.\nIndestructible\nAnnihilator 4 (Whenever this creature attacks, defending player sacrifices four permanents.)\nWhen Ulamog, the Infinite Gyre is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.',
            uniqueId: 15,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 31,
        },
    },
    {
        cardInfo: {
            apiCardId: '18468b64-37ef-5e4d-b95a-781265b533a2',
            name: 'Abzan Falconer',
            frenchName: 'Fauconnier abzan',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571337&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571999&type=card',
            manaCost: 3,
            rarity: CardRarity.unCommon,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Steven Belledin',
            text: 'Outlast {W} ({W}, {T}: Put a +1/+1 counter on this creature. Outlast only as a sorcery.)\nEach creature you control with a +1/+1 counter on it has flying.',
            uniqueId: 16,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.excellent,
            languageName: 'English',
            userCardId: 32,
        },
    },
    {
        cardInfo: {
            apiCardId: '454b109d-f148-5f55-a5a0-7316e013e8fa',
            name: 'Ainok Bond-Kin',
            frenchName: "Frère d'armes aïnok",
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571338&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=572000&type=card',
            manaCost: 2,
            rarity: CardRarity.common,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Chris Rahn',
            text: 'Outlast {1}{W} ({1}{W}, {T}: Put a +1/+1 counter on this creature. Outlast only as a sorcery.)\nEach creature you control with a +1/+1 counter on it has first strike.',
            uniqueId: 17,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.lightPlayed,
            languageName: 'English',
            userCardId: 33,
        },
    },
    {
        cardInfo: {
            apiCardId: 'ab1619d5-df3c-5434-b900-36561e62468f',
            name: 'Anointer of Valor',
            frenchName: 'Consécratrice du courage',
            imageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=571339&type=card',
            frenchImageUrl:
                'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=572001&type=card',
            manaCost: 6,
            rarity: CardRarity.common,
            setAbbreviation: '2X2',
            setName: 'Double Masters 2022',
            artist: 'Antonio José Manzanedo',
            text: 'Flying\nWhenever a creature attacks, you may pay {3}. When you do, put a +1/+1 counter on that creature.',
            uniqueId: 18,
        },
        userInfo: {
            userId: 3,
            qualityName: CardQuality.good,
            languageName: 'French',
            userCardId: 34,
        },
    },
];
