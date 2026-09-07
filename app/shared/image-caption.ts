export type ImageCaptionLocale = "vi" | "en";

type LocalizedCaption = Record<ImageCaptionLocale, string>;

const captions: Record<string, LocalizedCaption> = {
  "training-management/original-screenshots/course-list.png": { vi: "Danh sách khóa đào tạo", en: "Training course list" },
  "training-management/original-screenshots/course-matrix.png": { vi: "Ma trận đào tạo", en: "Training matrix" },
  "training-management/original-screenshots/training-plan.png": { vi: "Kế hoạch huấn luyện", en: "Training plan" },
  "training-management/original-screenshots/course-lessons.png": { vi: "Danh sách bài học trong khóa", en: "Course lesson list" },
  "training-management/original-screenshots/lesson-content.png": { vi: "Nội dung bài học", en: "Lesson content" },
  "training-management/original-screenshots/results-report.png": { vi: "Báo cáo kết quả đào tạo", en: "Training results report" },

  "risk-management/original-screenshots/project-create.png": { vi: "Khởi tạo dự án đánh giá rủi ro", en: "Risk assessment project setup" },
  "risk-management/original-screenshots/risk-assessment.png": { vi: "Thực hiện đánh giá rủi ro", en: "Risk assessment" },
  "risk-management/original-screenshots/assessment-form.png": { vi: "Biểu mẫu đánh giá rủi ro", en: "Risk assessment form" },
  "risk-management/original-screenshots/formula-builder.png": { vi: "Thiết lập công thức tính mức rủi ro", en: "Risk scoring formula setup" },
  "risk-management/original-screenshots/control-measures.png": { vi: "Biện pháp kiểm soát rủi ro", en: "Risk control measures" },
  "risk-management/original-screenshots/statistics.png": { vi: "Thống kê và báo cáo rủi ro", en: "Risk analytics and reporting" },

  "contractor-management/original-screenshots/contractor-list.png": { vi: "Danh sách nhà thầu", en: "Contractor list" },
  "contractor-management/original-screenshots/work-permits.png": { vi: "Quản lý giấy phép làm việc", en: "Work permit management" },
  "contractor-management/original-screenshots/dashboard.png": { vi: "Tổng quan quản lý nhà thầu", en: "Contractor management dashboard" },
  "contractor-management/original-screenshots/work-list.png": { vi: "Danh sách công việc nhà thầu", en: "Contractor work list" },
  "contractor-management/original-screenshots/worker-list.png": { vi: "Danh sách nhân sự nhà thầu", en: "Contractor workforce list" },

  "module-solutions/screenshots/safety-observation/category-config.png": { vi: "Cấu hình nhóm danh mục quan sát", en: "Observation category configuration" },
  "module-solutions/screenshots/safety-observation/create-report.png": { vi: "Tạo báo cáo quan sát an toàn", en: "Create safety observation report" },
  "module-solutions/screenshots/safety-observation/employee-reports.png": { vi: "Danh sách báo cáo của người lao động", en: "Employee safety reports" },
  "module-solutions/screenshots/safety-observation/report-entry.png": { vi: "Chi tiết ghi nhận quan sát an toàn", en: "Safety observation report details" },

  "module-solutions/screenshots/equipment-management/add-device.png": { vi: "Thêm mới thiết bị", en: "Add equipment" },
  "module-solutions/screenshots/equipment-management/report-results.png": { vi: "Báo cáo kết quả kiểm định", en: "Inspection results report" },
  "module-solutions/screenshots/equipment-management/inspection-plan.png": { vi: "Kế hoạch kiểm định thiết bị", en: "Equipment inspection plan" },
  "module-solutions/screenshots/equipment-management/device-groups.png": { vi: "Danh mục nhóm thiết bị", en: "Equipment group catalogue" },
  "module-solutions/screenshots/equipment-management/maintenance-plan.png": { vi: "Kế hoạch bảo trì thiết bị", en: "Equipment maintenance plan" },

  "module-solutions/screenshots/environmental-management/dashboard.png": { vi: "Tổng quan quan trắc môi trường lao động", en: "Occupational environment monitoring dashboard" },
  "module-solutions/screenshots/environmental-management/monitoring-plans.png": { vi: "Kế hoạch quan trắc môi trường lao động", en: "Occupational environment monitoring plans" },
  "module-solutions/screenshots/environmental-management/locations.png": { vi: "Danh mục vị trí quan trắc", en: "Monitoring location catalogue" },
  "module-solutions/screenshots/environmental-management/result-entry.png": { vi: "Nhập kết quả quan trắc", en: "Monitoring result entry" },
  "module-solutions/screenshots/environmental-management/criteria.png": { vi: "Danh mục chỉ tiêu quan trắc", en: "Monitoring parameter catalogue" },

  "module-solutions/screenshots/safety-culture/campaign-list.png": { vi: "Danh sách đợt khảo sát văn hóa an toàn", en: "Safety culture survey campaigns" },
  "module-solutions/screenshots/safety-culture/bradley-curve.png": { vi: "Phân tích Đường cong Bradley", en: "Bradley Curve analysis" },
  "module-solutions/screenshots/safety-culture/results-analysis.png": { vi: "Phân tích kết quả khảo sát", en: "Survey results analysis" },
  "module-solutions/screenshots/safety-culture/question-detail-rates.png": { vi: "Tỷ lệ phản hồi theo câu hỏi", en: "Response rates by question" },

  "module-solutions/screenshots/legal-compliance/overview-chart.png": { vi: "Biểu đồ tổng quan tuân thủ pháp luật", en: "Legal compliance overview chart" },
  "module-solutions/screenshots/legal-compliance/detail-chart.png": { vi: "Biểu đồ chi tiết mức độ tuân thủ", en: "Detailed compliance chart" },
  "module-solutions/screenshots/legal-compliance/question-list.png": { vi: "Danh sách tiêu chí đánh giá tuân thủ", en: "Compliance assessment criteria" },
  "module-solutions/screenshots/legal-compliance/assessment-period.png": { vi: "Kỳ đánh giá tuân thủ", en: "Compliance assessment period" },
  "module-solutions/screenshots/legal-compliance/assessment-screen.png": { vi: "Thực hiện đánh giá tuân thủ", en: "Compliance assessment" },

  "health-management/original-screenshots/sample-criteria.png": { vi: "Bộ tiêu chí khám sức khỏe mẫu", en: "Health examination criteria template" },
  "health-management/original-screenshots/exam-plan.png": { vi: "Kế hoạch khám sức khỏe", en: "Health examination plan" },
  "health-management/original-screenshots/exam-results.png": { vi: "Kết quả khám sức khỏe", en: "Health examination results" },
  "health-management/original-screenshots/disease-list.png": { vi: "Danh mục bệnh", en: "Disease catalogue" },
  "health-management/original-screenshots/exam-types.png": { vi: "Danh mục loại hình khám sức khỏe", en: "Health examination types" },
  "health-management/original-screenshots/exam-criteria.png": { vi: "Tiêu chí khám sức khỏe", en: "Health examination criteria" },
  "health-management/loai-kham-suc-khoe.png": { vi: "Danh mục loại hình khám sức khỏe", en: "Health examination types" },
  "health-management/danh-sach-benh.png": { vi: "Danh mục bệnh", en: "Disease catalogue" },
  "health-management/tieu-chi-kham.png": { vi: "Tiêu chí khám sức khỏe", en: "Health examination criteria" },
  "health-management/bo-tieu-chi-mau.png": { vi: "Bộ tiêu chí khám sức khỏe mẫu", en: "Health examination criteria template" },
  "health-management/ke-hoach-kham.png": { vi: "Kế hoạch khám sức khỏe", en: "Health examination plan" },
  "health-management/ket-qua-kham.png": { vi: "Kết quả khám sức khỏe", en: "Health examination results" },
};

export function getImageCaption(imagePath: string, locale: ImageCaptionLocale, fallbackLabel?: string) {
  const normalizedPath = decodeURIComponent(imagePath.split(/[?#]/, 1)[0]).replace(/^\/+assets\//, "");
  const directCaption = captions[normalizedPath];
  if (directCaption) return directCaption[locale];

  const healthPath = normalizedPath.startsWith("health-management/")
    ? normalizedPath
    : `health-management/${normalizedPath.replace(/^\/+/, "")}`;
  return captions[healthPath]?.[locale] ?? fallbackLabel ?? (locale === "vi" ? "Màn hình chức năng" : "Feature screen");
}
