

import * as z from 'zod';


export const threadValidations = z.object({
    thread: z.string().nonempty().min(3,{message:'Minimum of AtLeast 3 Characters'}),
    accountId:z.string(),
});

export const commentValidations = z.object({
    thread: z.string().nonempty().min(3,{message:'Minimum of AtLeast 3 Characters'}),
});