"use client";
import BlurText from "@/components/BlurText";

const handleAnimationComplete = () => {
    console.log("Animation completed!");
};

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <BlurText
                text="Isn't this so cool?!"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-6xl font-bold text-white"
            />
        </main>
    );
}
