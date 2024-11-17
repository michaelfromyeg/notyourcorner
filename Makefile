client:
	cd client && npm start && cd ..

enrich:
	python -m server.enrich

install:
	bash scripts/setup.sh
