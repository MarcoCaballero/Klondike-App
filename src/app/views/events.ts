import { Card } from 'app/model/card';
import { Tableau } from 'app/model/tableau';
import { Waste } from 'app/model/waste';

export interface DoubleClickOnTableauEvent {
    tableau: Tableau,
    card: Card
}

export interface DoubleClickOnWasteEvent {
    waste: Waste,
    card: Card
}