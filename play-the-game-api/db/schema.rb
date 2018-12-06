# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_06_212722) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.bigint "pile_id"
    t.bigint "hand_id"
    t.bigint "deck_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "value"
    t.index ["deck_id"], name: "index_cards_on_deck_id"
    t.index ["hand_id"], name: "index_cards_on_hand_id"
    t.index ["pile_id"], name: "index_cards_on_pile_id"
  end

  create_table "decks", force: :cascade do |t|
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_decks_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.boolean "status"
    t.string "playerName"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hands", force: :cascade do |t|
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_hands_on_game_id"
  end

  create_table "piles", force: :cascade do |t|
    t.boolean "asc"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_piles_on_game_id"
  end

  add_foreign_key "cards", "decks"
  add_foreign_key "cards", "hands"
  add_foreign_key "cards", "piles"
  add_foreign_key "decks", "games"
  add_foreign_key "hands", "games"
  add_foreign_key "piles", "games"
end
