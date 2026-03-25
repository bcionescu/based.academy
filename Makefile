SOURCES := $(sort $(wildcard content/creators/*.md))
CARD_FRAGMENTS := $(patsubst content/creators/%.md,build/cards/%.html,$(SOURCES))
FEED_FRAGMENTS := $(patsubst content/creators/%.md,build/feed/%.xml,$(SOURCES))
FIRST_SOURCE := $(firstword $(SOURCES))
PANDOC_FLAGS := --from=markdown-citations --wrap=none

.PHONY: all clean

all: index.html feed.atom

build/cards build/feed:
	mkdir -p $@

# HTML card fragments — first card has no spacer, rest do
build/cards/%.html: content/creators/%.md templates/card.html | build/cards
	$(eval SPACER := $(if $(filter $<,$(FIRST_SOURCE)),,--variable spacer=true))
	@echo "CARD  $< -> $@"
	pandoc --template=templates/card.html $(PANDOC_FLAGS) --to=html $(SPACER) -o $@ $<

# Atom feed entry fragments
build/feed/%.xml: content/creators/%.md templates/feed-entry.xml | build/feed
	@echo "FEED  $< -> $@"
	pandoc --template=templates/feed-entry.xml $(PANDOC_FLAGS) --to=html -o $@ $<

# Assemble index.html from header + card fragments + footer
index.html: templates/header.html $(CARD_FRAGMENTS) templates/footer.html
	@echo "ASSEMBLE index.html ($(words $(CARD_FRAGMENTS)) cards)"
	cat $^ > $@

# Compute latest date_iso from all creator files using pandoc metadata extraction
build/latest-date: $(SOURCES) templates/date-iso.txt | build/feed
	@echo "DATE  extracting latest date_iso from $(words $(SOURCES)) creators"
	for f in $(SOURCES); do pandoc --template=templates/date-iso.txt $(PANDOC_FLAGS) "$$f"; done | sort -r | head -1 > $@
	@echo "DATE  latest: $$(cat $@)"

# Render feed header with latest date, then concatenate with entries + footer
feed.atom: templates/feed-header.xml $(FEED_FRAGMENTS) templates/feed-footer.xml build/latest-date
	@echo "ASSEMBLE feed.atom ($(words $(FEED_FRAGMENTS)) entries)"
	pandoc --template=templates/feed-header.xml $(PANDOC_FLAGS) --to=html --variable latest_date="$$(cat build/latest-date)" -o build/feed-header-rendered.xml /dev/null
	cat build/feed-header-rendered.xml $(FEED_FRAGMENTS) templates/feed-footer.xml > $@

clean:
	rm -rf build/
