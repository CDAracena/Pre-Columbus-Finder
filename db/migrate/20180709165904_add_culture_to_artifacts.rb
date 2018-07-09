class AddCultureToArtifacts < ActiveRecord::Migration[5.2]
  def change
    add_column :artifacts, :culture, :string
  end
end
