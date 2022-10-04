export interface actionTypes {
   buttonDescription: string;
   canSubmit: any;
   isLoading?: boolean;
}

export interface RegisterTypes {
   fullName: string;
   username: string;
   email: string;
   password: string;
   roles?: string;
   profilePicture?: string;
   userBio?: string;
   verified?: boolean;
   active?: boolean;
}

export interface LoginTypes {
   email: string;
   password: string;
}

// getting text content
// const getText = (html) =>{
//    const doc = new DOMParser().parseFromString(html, "text/html")
//    return doc.body.textContent
//  }
