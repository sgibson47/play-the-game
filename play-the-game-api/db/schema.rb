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

ActiveRecord::Schema.define(version: 2019_01_12_211823) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.integer "value"
    t.string "whereIsCard_type"
    t.bigint "whereIsCard_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["whereIsCard_type", "whereIsCard_id"], name: "index_cards_on_whereIsCard_type_and_whereIsCard_id"
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
    t.integer "moves"
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

  add_foreign_key "decks", "games"
  add_foreign_key "hands", "games"
  add_foreign_key "piles", "games"
end
