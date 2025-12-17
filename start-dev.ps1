$root = $PSScriptRoot

# Launch Windows Terminal with 3 tabs
# Tab 1: Database (WSL) - Redis (detached) & Postgres (interactive)
# Tab 2: Server - bun run dev
# Tab 3: Mobile - bun run start

wt -w 0 --title "Database" wsl -e sh -c "docker start redis-server && echo 'Redis started' && docker start -a postgres-local" `; new-tab --title "Server" -d "$root\apps\server" cmd /k "bun run dev" `; new-tab --title "Mobile" -d "$root\apps\mobile" cmd /k "bun run start"`; new-tab --title "Matchmaker" -d "$root\apps\server" cmd /k "bun --watch src\workers\matchmakingWorker.ts`"; new-tab --title "Turn Update" -d "$root\apps\server" cmd /k "bun --watch src\workers\turnTimerWorker.ts"
