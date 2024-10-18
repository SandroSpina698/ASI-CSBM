export interface Card {
    id: number;
    imgUrl: string;
    description: string;
    price: number;
    name?: string;
    family?: string;
    affinity?: string;
    smallImgUrl?: string;
    energy?: string;
    hp?: number;
    defence?: number;
    attack?: number;
    userId?: number;
}