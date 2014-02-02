.PHONY: css watch

all: css

css:
	compass compile sass --force -e production

watch:
	compass watch sass