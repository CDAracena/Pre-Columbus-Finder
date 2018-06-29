class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :f_name
      t.string :l_name
      t.string :profile_pic

      t.timestamps
    end
  end
end
