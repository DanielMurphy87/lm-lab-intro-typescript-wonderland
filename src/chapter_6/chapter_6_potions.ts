import { endAdventure } from '../..';
import { wakeUp } from '../end_chapter/end_chapter_wake_up';
import { askQuestion, clear, print } from '../ui/console';

const POTIONS = ['Healing', 'Poison'] as const;
const MAKERS = ['Tweedle Dum', 'Tweedle Dee', 'The Caterpillar', 'Bill'] as const;

type Potion = typeof POTIONS[number];
type Maker = typeof MAKERS[number];

interface PotionMaker {
    name: Maker;
    makePotion: () => Potion;
}

const potionMakersList: ReadonlyArray<Maker> = MAKERS;

export function drinkPotion(): void {
    clear(true);
    print('You have found some strange potions on a table.');
    print('You must choose wisely, as they may me poisoned.');

    let poisoned: boolean = false;

    let makers: PotionMaker[] = getPotionMakers(potionMakersList);

    if (!makers || makers.length === 0) {
        print(`No potion makers are around to help you.`);
        poisoned = true;
    }

    let makerCount = 0;

    makers.forEach((maker) => {
        makerCount++;
        print(
            `${maker.name} has made a potion for you: ${maker.makePotion()}`
        );
        if (maker.makePotion() === 'Poison') {
            poisoned = true;
        }
    });

    if (makerCount < 4 || poisoned) {
        print(`You have drank poison! "Goodbye!" 😱`);
        return endAdventure();
    } else {
        print(`You have drank a healing potion! "Cheers!" 🎉`);
        print('Time to continue your journey...');
        return askQuestion('Press ENTER to continue! ', wakeUp);
    }
}

function getPotionMakers(makers: ReadonlyArray<Maker> = []): PotionMaker[] {
    return makers.map(n => { return { name: n, makePotion: () => 'Healing', } });
}