"use client";

// takes in name and description of the judge

interface JudgeProps {
    name: string;
    description: string;
    imgLink: string;
}

export function Judge({ name, description, imgLink }: JudgeProps) {
    return (
        <>
             <div className="judge-box flex flex-col items-center justify-between text-center max-w-[200px] flex-grow">
                <img className="h-[200px] max-w-full object-contain" src={"/characters/" + imgLink} />
                <p className="text-white text-shadow-effect text-3xl">{name}</p>
                <p className="text-white text-shadow-effect text-lg break-words px-2 min-h-[85px] hidden sm:block">
                    {description}
                </p>
            </div>
        </>
    )
}