class DateCreator
  def self.create_datetime(day_string, month_string, year_string)
    "#{day_string}-#{month_string}-#{year_string}".to_datetime
  end

  def self.stringify(datetime)
    "#{datetime.month}/#{datetime.day}/#{datetime.year}"
  end
end
