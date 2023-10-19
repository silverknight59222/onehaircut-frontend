// types.ts

export type Coiffeur = {
    nom: string;
    image: string;
    couleur: string;
    textColor: string;
};

export interface Booking {
    id: string;
    title: string;
    start: string;
    end:string;
    coiffeur: Coiffeur;
    backgroundColor?: string;
    textColor?: string;
    clientId: number
}
