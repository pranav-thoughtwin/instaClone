import Image from "next/image";

export default function Stories() {
    const stories = [
        {
            name: "itsdougthepug",
            icon: "/dogIcon"
        },
        {
            name: "itsdougthepug",
            icon: "/dogIcon"
        },
        {
            name: "itsdougthepug",
            icon: "/dogIcon"
        },
        {
            name: "itsdougthepug",
            icon: "/dogIcon"
        },
        {
            name: "itsdougthepug",
            icon: "/dogIcon"
        },
        {
            name: "itsdougthepug",
            icon: "/dogIcon"
        },
    ]
    return (
        <div>
            <div className="flex space-x-2 ml-10">
                {
                    stories.map((item, idx) => {
                        return (
                            <div key={idx} className="cursor-pointer">
                                <div>
                                    <Image
                                        src={`${item.icon}.png`}
                                        width={70}
                                        height={70}
                                        alt={`${item.name}`}
                                        className="mx-auto m-12 rounded-full"
                                    />
                                </div>
                                <div className="text-xs -mt-12">{item.name}</div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}