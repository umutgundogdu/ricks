import { MultiSelect } from "@/components";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { MantineProvider } from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
import "@mantine/core/styles.css";
import styles from "./App.module.css";

function App() {
    return (
        <JotaiProvider>
            <MantineProvider>
                <ApolloProvider client={client}>
                    <div className={styles.container}>
                        <MultiSelect placeholder="Search Rick..." />
                    </div>
                </ApolloProvider>
            </MantineProvider>
        </JotaiProvider>
    );
}

export default App;
