dev:
	@docker compose down
	@docker compose -f dev.docker-compose.yml up -d --wait
	@node ace migration:fresh
	@pnpm run dev

down:
	@-docker compose -f dev.docker-compose.yml down
