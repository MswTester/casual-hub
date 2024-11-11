import Link from "next/link";

const DB:DB[] = [
  {
    id: 'seat',
    title: '자리뽑기',
    description: '자리뽑기를 할 수 있는 앱입니다.'
  },
  {
    id: 'keyviewer',
    title: '키뷰어',
    description: '키뷰어입니다.'
  },
  {
    id: 'yangsan1',
    title: '복제복제 게임',
    description: '광고에서 본 양산형 게임입니다'
  },
  {
    id: 'gamble',
    title: '도박',
    description: '도박입니다.'
  }
]

export default function Home() {
  return (
    <main className="flex flex-col justity-start items-center w-full h-full overflow-y-auto overflow-x-hidden p-1 gap-1 lg:p-2 lg:gap-2">
      {DB.map((app) => (
        <Link href={app.id} key={app.id} className="flex flex-col justify-center items-center w-full h-24 p-2 bg-gray-100 rounded-md shadow-md">
          <h1 className="text-lg font-bold">{app.title}</h1>
          <p className="text-sm">{app.description}</p>
        </Link>
      ))}
    </main>
  );
}
