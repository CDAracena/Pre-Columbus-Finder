class AddObjectIdToArtifacts < ActiveRecord::Migration[5.2]
  def change
    add_column :artifacts, :object_id, :string
  end
end
