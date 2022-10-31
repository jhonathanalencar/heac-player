import { FileType } from "../../../pages/Home";
import { apiSlice } from "../../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUploadedFiles: build.query<FileType[], void>({
      query: () => '/uploads',
      providesTags: (result, err, arg) =>
        result 
          ? [
              ...result.map((item) => ({ type: 'File' as const, id: item._id })),
              { type: 'File' as const, id: 'LIST' },
            ]
          : [
              { type: 'File' as const, id: 'LIST' },
            ]
    }),
    getVideoById: build.query<FileType, string | undefined>({
      query: (id) => `/uploads/${id}`,
    }),
    deleteUploadedFile: build.mutation<FileType, string>({
      query: (id) =>({
        url: `/uploads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) =>[
        { type: 'File', id: arg},
      ],
    }),
  }),
});

export const {
  useGetUploadedFilesQuery,
  useGetVideoByIdQuery,
  useDeleteUploadedFileMutation,
} = extendedApiSlice;