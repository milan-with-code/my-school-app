import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect } from "react";

export default function NativeIntent() {
    useEffect(() => {
        // Handle app opened from deep link / intent
        const handleUrl = ({ url }: { url: string }) => {
            const parsed = Linking.parse(url);

            /**
             * Example URLs:
             * myapp://home
             * myapp://profile
             * myapp://home/123
             */

            if (!parsed.path) return;

            // Redirect based on path
            router.replace(`/${parsed.path}`);
        };

        // App opened from background
        const subscription = Linking.addEventListener("url", handleUrl);

        // App opened from killed state
        Linking.getInitialURL().then((url) => {
            if (url) {
                handleUrl({ url });
            }
        });

        return () => subscription.remove();
    }, []);

    return null;
}
