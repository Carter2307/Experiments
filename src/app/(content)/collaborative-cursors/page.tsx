import CollaborativeCursorClient from "./client";

export const metadata = {
    title: "Collaborative Cursors",
    slug: "collaborative-cursors",
    date: "August 16, 2024"
}

export default function CollaborativeCursor() {
    return <CollaborativeCursorClient metadata={metadata}/>
}