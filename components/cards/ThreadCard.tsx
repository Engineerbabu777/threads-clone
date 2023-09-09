'use client';



type Props = {
    currentUser: string;
    parentId: string;
    content: string;
    author: { name: string, image: string, id: string } | null;
    comments: any;
    community: { id: string, name: string, image: string } | null;
    createdAt: any;
    id: any;
    isComment?: boolean;
}

export default function ThreadCard({ content, currentUser, parentId, author, comments, community, createdAt, id, isComment }: Props) {



    return (<>

        <article className="">
            <h2 className="">{content}</h2>
        </article>



    </>)
}