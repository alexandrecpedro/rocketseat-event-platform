// import { gql, useQuery } from "@apollo/client";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

// const GET_LESSONS_QUERY = gql`
//     query {
//         lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
//             id
//             lessonType
//             availableAt
//             title
//             slug
//         }
//     }
// `
// // Response type of GET_LESSONS_QUERY
// interface GetLessonsQueryResponse {
//     lessons: {
//         id: string;
//         title: string;
//         slug: string;
//         availableAt: string;
//         lessonType: "live" | "class";
//     }[]
//     // Other option to write
//     // lessons: Array<{
//     //     id: string;
//     //     title: string;
//     //     slug: string;
//     //     availableAt: string;
//     //     lessonType: "live" | "class";
//     // }>
// }

export function Sidebar() {
    // const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
    const { data } = useGetLessonsQuery();

    return (
        // When we don't have any specif measure at Tailwind, just put it inside square brackets []
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            // converting availableAt property to a JavaScript Date format
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    );
}