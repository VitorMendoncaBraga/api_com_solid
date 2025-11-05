import {defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    // config de testes
    test: {
        dir: "src",
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    dir: 'src/services'
                }
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    dir: 'src/http/controllers',
                    environment: './prisma/vitest-enviroment-prisma/prisma-test-enviroment.ts'
                }
            }
        ]
    }
})