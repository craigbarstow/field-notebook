class DateCreator
  def self.create_datetime(day_string, month_string, year_string)
    "#{day_string}-#{month_string}-#{year_string}".to_datetime
  end
end
