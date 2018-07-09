class AddTimePeriodToArtifacts < ActiveRecord::Migration[5.2]
  def change
    add_column :artifacts, :timePeriod, :string
  end
end
