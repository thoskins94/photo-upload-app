export interface Photo {
    name: string;
    desc: string;
    user: number;
}

export interface ListPhoto {
    data: string,
    contentType: string,
    fileName: string,
    _id: string,
    img:{
        data: string,
        contentType:string,
    }
}
