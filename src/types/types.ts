export type postsType = {
    id: number,
    messages: string, 
    likesCount: number
}

export type contactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

export type photosType = {
    small: string | null,
    large: string | null
}

export type profileType = {
    userId: number, 
    lookingForAJob: boolean, 
    lookingForAJobDescription: string,
    fullName: string,
    contacts: contactsType
    photos: photosType
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: photosType
}

export type messagesType = {
    id: number,
    messages: string
}

export type dialogType = {
    id: number,
    name: string
}