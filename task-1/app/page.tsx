import MagnetLines from "@/components/MagnetLines";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <MagnetLines
                rows={9}
                columns={9}
                containerSize="60vmin"
                lineColor="white"
                lineWidth="0.8vmin"
                lineHeight="5vmin"
                baseAngle={0}
            />
        </main>
    );
}
