class CreateUserFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :user_favorites do |t|
      t.integer :user_id
      t.integer :artifact_id
      t.integer :num_of_likes

      t.timestamps
    end
  end
end
