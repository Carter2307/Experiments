export enum CraftCategory {
    animation = "Animations", tool = "Tools", system = "Systems", blog = "Blog",
}

export type CraftItem = {
    title: string
    date: string
    url: string
    slug: string
    category: CraftCategory
};

export type Craft = {
    category: CraftCategory
    items: CraftItem[]
};

export const CRAFTS: Craft[] = [{
    category: CraftCategory.animation, items: [{
        title: "Prompt Box Attachment", date: "5 Jan 2025", url: "/animations/prompt-box-attachment",
        slug: "prompt-box-attachment",
        category: CraftCategory.animation
    }, {
        title: "Sticky content on scroll", date: "5 Jan 2025", url: "/animations/sticky-on-scroll",
        slug: "sticky-on-scroll",
        category: CraftCategory.animation
    }]
}]
