export interface WineImage {
    name: string,
    file: File
}

interface WineBasic {
    id: string,
    name: string,
    grape: string,
    year: string,
}

export interface Wine extends WineBasic {
    image: string | WineImage | null
}